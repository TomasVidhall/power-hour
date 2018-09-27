import React from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';

import KeepAwake from 'react-native-keep-awake';

import sounds from './sounds';

let timeout;

let interval;

const TIME_BETWEEN_SHOTS = 60;

console.disableYellowBox = true;

const NUMBER_OF_SHOTS = 60;

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      timerRunning: false,
      countdown: 0,
      shotsLeft: 0,
      fontSize: 40
    }
  }


  countdown = () => {
    if (this.state.countdown === 1) {
      sounds.playRandomSound();
    } else if (this.state.countdown === 0) {
      if (this.state.shotsLeft === 1) {
        timeout = setTimeout(sounds.playEndSound, 5000);
        sounds.playEndSound();
        return this.setState({
          timerRunning: false
        })
      }
      timeout = setTimeout(this.countdown, 1000);
      return this.setState({
        shotsLeft: this.state.shotsLeft - 1,
        countdown: TIME_BETWEEN_SHOTS
      });
    }
    this.setState({
      countdown: this.state.countdown - 1,
    });
    timeout = setTimeout(this.countdown, 1000);
  }

  cycleAnimation() {
    const animatedFontsize = new Animated.Value(100);
    const animatedRotation = new Animated.Value(100);
    this.setState({
      fontSize: animatedFontsize,
      rotation: animatedRotation
    })
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animatedFontsize, {
          toValue: 40,
          duration: 500
        }),
        Animated.timing(animatedFontsize, {
          toValue: 100,
          duration: 500
        })
      ]),
      Animated.sequence([
        Animated.timing(animatedRotation, {
          toValue: 1000,
          duration: 500
        }),
        Animated.timing(animatedRotation, {
          toValue: 100,
          duration: 500
        })
      ])
    ]).start(() => {
      this.cycleAnimation();
    });
  }



  render() {
    if (!this.state.timerRunning) {
      return (
        <View style={styles.container}>
          <Button
            color="#841584"
            title="STARTA POWER HOUR"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
            onPress={() => {
              timeout = setTimeout(this.countdown, 1000);
              this.cycleAnimation();
              this.setState({
                timerRunning: true,
                countdown: TIME_BETWEEN_SHOTS,
                shotsLeft: NUMBER_OF_SHOTS,
              })
            }}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>{this.state.shotsLeft} shottar kvar</Text>
        <Animated.Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: this.state.fontSize, transform: [{rotate: `180deg`}] }}>{this.state.countdown}</Animated.Text>
        <View style={{ display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-between' }}>
          <Animated.Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: this.state.fontSize, transform: [{rotate: `90deg`}] }}>{this.state.countdown}</Animated.Text>
          <Animated.Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: this.state.fontSize, transform: [{rotate: `270deg`}] }}>{this.state.countdown}</Animated.Text>
          </View>
        <Animated.Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: this.state.fontSize, transform: [{rotate: `0deg`}] }}>{this.state.countdown}</Animated.Text>
        <KeepAwake />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
