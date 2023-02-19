import React from 'react'
import { View, Text,Button } from 'react-native'

function HomeScreen(props){
    return (
        <View style={styles.container}>
         <Text>أهلا بك في الشاشة الرئسية</Text>
         <Button 
            title="انتقل الى شاشة اللأطباء"
            onPress={()=> props.navigation.navigate('Doctors')}
         
         />

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

export default HomeScreen;
