import React,{useState,useEffect} from 'react'
import { View, Text, ImageBackground, TouchableNativeFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'

function HomeScreen(props){
   const [token, setToken] = useState('')
   const {navigation} = props

   const _checkToken = async() =>{
      const token = await AsyncStorage.getItem('accessToken')
      setToken(token)
   }
   //check token when navigation
   useEffect(() => {
      const unsubscribe = navigation.addListener('focus',()=>{
         _checkToken()
      })
      return unsubscribe
   },[navigation])
    return (
        <React.Fragment>
            <ImageBackground style={styles.background} source={require('../assets/doc-bg.png')}>
               <View style={styles.container}>
                  
                  <View style={styles.textContainer}>
                        <Text style={styles.title}>أهلا بك في طبيبي</Text>
                        <Text style={styles.text}>التطبيق الأول للربط بيم الأطباء والمرضى بطريقة عصرية وسريعة</Text>
                        {token ? (
                           <React.Fragment>
                              <Button 
                                 text="انتقل الى شاشة اللأطباء"
                                 onPress={()=> props.navigation.navigate('Doctors')}
                        
                              />
                              <TouchableNativeFeedback
                                 onPress={()=> props.navigation.navigate('Profile')}
                              >
                                 <Text style={styles.labelButton}>استعراض الملف الشخصي</Text>
                              </TouchableNativeFeedback>
                           </React.Fragment>
                        ):(
                           <React.Fragment>
                              <Button 
                                 text="تسجيل الدخول"
                                 onPress={()=> props.navigation.navigate('SignIn')}
                        
                              />
                              <TouchableNativeFeedback
                                 onPress={()=> props.navigation.navigate('SignUp')}
                              >
                                 <Text style={styles.labelButton}>انشاء حساب جديد</Text>
                              </TouchableNativeFeedback>
                           </React.Fragment>
                        )}
                        

                     </View>
                  </View>
               
            </ImageBackground>
            
        </React.Fragment>
    );
}
const testStyles= {
      color:"#fff",
      textAlign: 'center',
      margin:10

}
const styles = {
   background: {
      width:'100%',
      height:'100%'
   },
   container: {
       flex: 1,
       backgroundColor: 'rgba(0,0,0,0.7)',
       justifyContent: 'center',
       alignItems: 'center',
   },
   textContainer: {
      marginBottom:30
   },
   title:{
      ...testStyles,
      fontSize:35
   },
   text:{
      ...testStyles,
      textSize:20
   },
   labelButton:{
      marginTop:10,
      fontSize:16,
      textAlign:'center',
      color:'#fff'
   }
};

export default HomeScreen;
