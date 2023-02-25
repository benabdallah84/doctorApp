import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { View, Text } from 'react-native'

const ScreenTitle= ({title,icon}) => {
    return (
        <View style={styles.container}>
            <Ionicons 
            name={icon}
            size={75}
            style={styles.icon}
            />
         <Text style={styles.icon}>{title}</Text>
       </View>
    );
}

const styles = {
   container: {
       
       marginBottom: 30,
       alignItems: 'center',
   },
   icon:{
    color:'#007bff',
    marginBottom: 10,
   },
   text:{
    fontSize: 25,
   }
};

export default ScreenTitle;
