import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  RTCView,
  getUserMedia,
} from 'react-native-webrtc';

export default class VideoTest extends Component {
    
    constructor(props) {
        super(props);
        this.state = { videoURL : 'abc' };
    }

    onPress() {
        getUserMedia({
            audio: false,
            video: {
              mandatory: {
                  minWidth: 240, // Provide your own width, height and frame rate here
                  minHeight: 300,
                  minFrameRate: 30
              },
              facingMode: 'environment',
            }
          },
            (stream => {
              console.log(stream);
              this.setState({
                videoURL: stream.toURL()
              })
            }),
            (error => console.error('getUserMedia failed with error: ' + error))
          );

        // getUserMedia({
        //     audio: true,
        //     video: {
        //       mandatory: {},
        //     }
        //   }).then(stream => {
        //   console.log('dddd', stream);
        //   return stream
        // }).catch(err => console.error(err));
    }

    render() {
        return(
            <View>
                <Text style={styles.welcome}>
                Welcome to ReactNativeWebRTC!
                </Text>
                <Text style={styles.instructions}>
                {JSON.stringify(this.state.videoURL)}
                </Text>
                <RTCView style={styles.rtc} streamURL={this.state.videoURL} />
                <Button title="getUserMedia()"
                        onPress={() => this.onPress()}   
                        color="#841584"
                />
            </View>
        );
    }
}

 // import Permissions from 'react-native-permissions';
 // var Permissions = require('react-native-permissions');

// export default class VideoTest extends Component {  

//   constructor() {                 
//     super();

//     this.state = {
//       videoURL: null,
//      //  permissions: null,
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to ReactNativeWebRTC!
//         </Text>
//         <RTCView style={styles.rtc} streamURL={this.state.videoURL} />
//         <Text style={styles.instructions}>
//           {JSON.stringify(this.state, null, 2)}
//         </Text>
//         <Button
//           onPress={() => this.onPress()}
//           title="getUserMedia()"
//           color="#841584"
//         />
//       </View>
//     );
//   }

//  componentDidMount() {
//      console.log('inside video Test')
//     /* Promise.all([
//       Permissions.requestPermission('camera'),
//       Permissions.requestPermission('microphone'),
//     ])
//     .then(([cam, mic]) => {
//       this.setState({ permissions: { cam, mic } });
//     });*/
//   } 

//   onPress() {
//     getUserMedia({
//         audio: true,
//         video: {
//           mandatory: {},
//         }
//       },
//       stream => {
//         this.setState({ videoURL: stream.toURL() });
//       },
//       err => console.error(err)
//     );
//   }
// }

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 20,
  },
  instructions: {
    backgroundColor: '#000',
    color: 'white',
    padding: 5,
    marginTop: 10,
  },
  rtc: {
    height: 360,
    width: 640,
    backgroundColor: '#000',
  }
});