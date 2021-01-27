import React, {useState} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'

const Progress = ({step, steps, height}) => {
  const animatedValue = React.useRef(new Animated.Value(-1000)).current
  const reactive = React.useRef(new Animated.Value(-1000)).current
  const [width, setWidth] = useState(0)

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps)
  }, [step, width])
  return (
    <>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 12,
          marginBottom: 5,
        }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width
          setWidth(newWidth)
        }}
        style={{
          height,
          backgroundColor: 'lightgrey',
          borderRadius: 50,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height,
            width: '100%',
            borderRadius: height,
            backgroundColor: '#000',
            position: 'absolute',
            left: 0,
            right: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}></Animated.View>
      </View>
    </>
  )
}

const Home = ({route}) => {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (100 + 1))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <View style={styles.container}>
      <Text> {route.params.p1} </Text>
      <Text> {route.params.p2} </Text>
      <Progress step={index} steps={100} height={10} width={10} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
