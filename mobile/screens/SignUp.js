import React from 'react'
import { ScrollView, KeyboardAvoidingView,CheckBox,Platform, View, Text } from 'react-native'

function SingUpScreen(){
    return (
        <View style={styles.container}>
         <Text>شاشة تسجيل حساب جديد</Text>
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

export default SingUpScreen;
