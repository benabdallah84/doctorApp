import React from 'react'
import { View, Text,TouchableNativeFeedback,StyleSheet } from 'react-native'

function Button({onPress, text,buttonStyles, textStyles}){
    return (
        <View style={styles.container}>
         <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.SelectableBackground()}
         >
            <View style={[styles.button,buttonStyles]}>
            <Text style={[styles.text, textStyles]}>{text}</Text>
            </View>
         </TouchableNativeFeedback>
       </View>
    );

    
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',


    },
    text:{

        fontSize:18,
        color:'#fff',
        textAlign:'center',
        alignSelf:'center',
        lineHeight:20
    },
    button:{
        paddingVertical:12,
        paddingHorizontal:40,
        backgroundColor: '#007bff',
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200

    }
})

export default Button;
