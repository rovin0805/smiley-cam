import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";

export default class App extends React.Component {
  state = {
    hasPermission: null,
  };
  componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      this.setState({ hasPermission: true });
    } else {
      this.setState({ hasPermission: false });
    }
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === true) {
      return (
        <View>
          <Text>Has permissions</Text>
        </View>
      );
    } else if (hasPermission === false) {
      return (
        <View>
          <Text>Don't have permission for this</Text>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}
