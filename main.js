'use strict';

import DeviceInfo from 'react-native-device-info';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} from 'react-native-webrtc';
import io from 'socket.io-client/dist/socket.io';

/* CUSTOM IMPORT STYLES BELOW */
import { styles } from './styles/mainStyle';

const socket = io.connect('http://192.168.1.12:3000', {jsonp: false});

export default class ReactNativeWebRCTDemo extends Component {
    constructor() {
        super();
        this.state = {
            currentStream: null,
            myVideoURL: null,
            theirVideoURL: null,
            answerCallStatus: true,
            endCallStatus: false,
        };
    }

    startCall() {
        this.setState({
            answerCallStatus: false,
            declineCallStatus: false,
            endCallStatus: true
        });

        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    width: 0,
                    height: 0,
                    minFrameRate: 30
                }
            }
        };

        var successCallback = (stream) => {
            this.setState({
                myVideoURL: stream.toURL(),
                currentStream: stream
            });
        }

        var errorCallback = (error) => {
            console.log("Oooops we got an error!", error.message);
            throw error;
        }

        getUserMedia(constraints, successCallback, errorCallback);

    } // end of startCall

    hangUp(currentStream) {
        this.setState({
            answerCallStatus: false,
            endCallStatus: false,
            myVideoURL: null,
            theirVideoURL: null
        });

        // stops device video
        currentStream.getTracks()[0].stop();

        // stops device audio
        currentStream.getTracks()[1].stop();
    } // end of hangUp

    render() {

        // variables to store TouchableOpacity component
        let answerCall,endCall;

        if(this.state.answerCallStatus === true || this.state.declineCallStatus === true) {
            answerCall =
            <TouchableOpacity style={styles.answerCall} onPress={ () => this.startCall() }>
                <Text style={styles.text}>Answer</Text>
            </TouchableOpacity>;
        }

        if(this.state.endCallStatus) {
            endCall =
            <TouchableOpacity style={styles.endCall} onPress={ () => this.hangUp(this.state.currentStream) }>
                <Text style={styles.text}>End</Text>
            </TouchableOpacity>;
        }

        return(
            <View style={styles.container}>
                <RTCView streamURL={this.state.myVideoURL} style={styles.videoSmall} />
                <RTCView streamURL={this.state.theirVideoURL} style={styles.videoLarge} />

                {endCall}
                {answerCall}

            </View>
        );
    }

} // end of ReactNativeWebRCTDemo
