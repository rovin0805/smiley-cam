import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
`;

const Text = styled.Text`
  color: white;
  font-size: 22px;
`;

const IconBar = styled.View`
  margin-top: 50px;
`;

export default class App extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.front,
  };

  componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      this.setState({ hasPermission: true });
    } else {
      this.setState({ hasPermission: false });
    }
  };

  switchCameraType = () => {
    const { cameraType } = this.state;
    if (cameraType === Camera.Constants.Type.front) {
      this.setState({
        cameraType: Camera.Constants.Type.back,
      });
    } else {
      this.setState({
        cameraType: Camera.Constants.Type.front,
      });
    }
  };

  render() {
    const { hasPermission, cameraType } = this.state;
    if (hasPermission === true) {
      return (
        <CenterView>
          <Camera
            style={{
              width: width - 40,
              height: height / 1.5,
              borderRadius: 10,
              overflow: "hidden",
            }}
            type={cameraType}
          />
          <IconBar>
            <TouchableOpacity onPress={this.switchCameraType}>
              <MaterialIcons
                name={
                  cameraType === Camera.Constants.Type.front
                    ? "camera-front"
                    : "camera-rear"
                }
                color="white"
                size={50}
              />
            </TouchableOpacity>
          </IconBar>
        </CenterView>
      );
    } else if (hasPermission === false) {
      return (
        <CenterView>
          <Text>Don't have permission for this</Text>
        </CenterView>
      );
    } else {
      return (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      );
    }
  }
}
