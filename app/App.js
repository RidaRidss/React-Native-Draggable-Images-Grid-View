/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  Image,
  View,
  Button,
  TouchableNativeFeedback
} from 'react-native';

import {Images , Metrics}from "./configs"; 

import SortableGrid from 'react-native-sortable-grid'
import cars from './data/cars';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	
	  constructor() {
    super()
    // this.numbers = [0,1,2,3,4,5,6,7,8,9,10,11]
    this.state = {
      animation: new Animated.Value(0),
    }
  }

  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
  randomRGB = () => 160 + Math.random()*85

  startCustomAnimation = () => {
    console.log("Custom animation started!")

    Animated.timing(
      this.state.animation,
      { toValue: 100, duration: 500 }
    ).start( () => {

      Animated.timing(
        this.state.animation,
        { toValue: 0, duration: 500 }
      ).start()

    })
  }

  getDragStartAnimation = () => {
    return { transform: [
      {
        scaleX: this.state.animation.interpolate({
          inputRange: [0, 100],
          outputRange: [1, -1.5],
        })
      },
      {
        scaleY: this.state.animation.interpolate({
          inputRange: [0, 100],
          outputRange: [1, 1.5],
        })
      },
      { rotate: this.state.animation.interpolate({
        inputRange:  [0, 100],
        outputRange: ['0 deg', '450 deg']})
      }
    ]}
  }

  render() {
    return (
          <View style={{paddingTop: 40 , flex:1,justifyContent : "space-between"}}>
          <View style={styles.contentContainer}>    
        <Text style={{alignSelf: 'center', fontWeight: 'bold', marginBottom: 10}}>Pictures</Text>
        <SortableGrid
          // blockTransitionDuration      = { 400 }
          activeBlockCenteringDuration = { 200 }
          itemsPerRow                  = { 4 }
          // dragActivationTreshold       = { 200 }
          dragStartAnimation           = { this.getDragStartAnimation() }
          // onDragRelease                = { (itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder) }
          onDragStart                  = { this.startCustomAnimation }
          ref                          = { 'SortableGrid' }
        >

        {

          cars.map( 
            (car , index) => (
              <View
                ref={ 'itemref_' + index }
                key={ index }
                style={[
                styles.block,
                   { backgroundColor: this.getColor() }
                ]}
              >
                <Image
                style={styles.carItem}
                  resizeMode="contain"
                  source={
                    Images[car.image]
                  }
                />
              </View>
            )
          )
        }
        </SortableGrid>
       <Text style={{fontWeight: 'bold', marginBottom: 30 ,marginTop : 10 , marginLeft : Metrics.ratio(20)}}>Drag to reorder</Text>
       <View style={styles.buttonView}>
          <TouchableNativeFeedback>
            <View style={[styles.button,styles.button1,styles.imageButton]}>
            <Image
                style={styles.cam}
                  resizeMode="contain"
                  source={
                    Images.gallery
                  }
                />
            <Text style={styles.buttonText}>Gallery</Text>
          </View>
        </TouchableNativeFeedback>
                  <TouchableNativeFeedback>
          <View style={[styles.button,styles.button2,styles.imageButton]}>
            <Image
                style={styles.cam}
                  resizeMode="contain"
                  source={
                    Images.cam
                  }
                />
            <Text style={styles.buttonText}>Camera</Text>
          </View>
        </TouchableNativeFeedback>  
       </View>
          </View>
       <View style={styles.bottom}>
        <View style={styles.buttonView}>
                 <TouchableNativeFeedback>
          <View style={[styles.button,styles.button1]}>
            <Text style={styles.buttonText}>Prev</Text>
          </View>
        </TouchableNativeFeedback>
                  <TouchableNativeFeedback>
          <View style={[styles.button, styles.button2]}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableNativeFeedback>
       </View>
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carItem : {
    width : Metrics.image.medium,
    height : Metrics.image.medium,
    resizeMode : "contain"
  },
  contentContainer: {
    flex:9
  },
  buttonView : {
    justifyContent : "space-between",
    flexDirection : "row",
    marginHorizontal : Metrics.smallMargin
  },
  button : {
    width : Metrics.ratio(150),
    height: Metrics.ratio(50),
    alignItems : "center",
    justifyContent : "center"
  },
  imageButton : {
    flexDirection : "row"
  },
    button1 : {
      backgroundColor : "#257FE6"
  },
    button2 : {
      backgroundColor : "#37AB33"
  },
 buttonText : {
  color : "#fff"
 },
  bottom : {
      width : Metrics.screenWidth ,
      alignSelf : "center",
      flex:1
  },
  cam : {
    width : Metrics.image.small,
    height : Metrics.image.small,
    resizeMode : "contain",
    marginRight : Metrics.ratio(2)
  }
});


