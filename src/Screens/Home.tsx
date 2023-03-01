import React from "react"
import { View,Text} from "react-native"
import { Signup } from "./Signup"
const Home=()=>{
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Signup/>
      </View>
    )
}

export default Home