import React from 'react'
import { View, Text } from 'react-native'

function DoctorScreen(){
    return (
        <View style={styles.container}>
         <Text>أهلا بك في شاشة الدكاترة</Text>
       </View>
    );
}

const styles = {
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
};

export default DoctorScreen;
