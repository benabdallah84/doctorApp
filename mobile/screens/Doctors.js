import React,{useState,useEffect} from 'react'
import { Text, FlatList,TouchableNativeFeedback, View, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../config/axios'
import { DOCTORS_URL } from '../config/urls'
import Input from '../components/Input'
import Loader from '../components/Loader'
import transformName , {debounce} from '../config/helpers'
import styles from './styles/doctorsStyles'
import DoctorDetails from './DoctorsDetails'

function DoctorScreen(){
    const [isLoading, setIsLoading] = useState(false)
    const [doctors,setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState(null)
   
   useEffect(()=>{
        _getDoctors()
   },[])
   
    const _getDoctors=(query)=>{
    (async()=>{
        setIsLoading(true)

        try{
            const token = await AsyncStorage.getItem('accessToken')
            axios.defaults.headers.common.Authorization =`JWT ${token}`
            const response =await axios.get(DOCTORS_URL,{params:{q:query ? query:''}})
            setDoctors(response.data)
            setIsLoading(false)

        }catch(err){
            setIsLoading(false)
        }
    })()
   }
   const search = debounce(value =>{
    _getDoctors(value)
   },1000)

   const itemPressHandler = itemId =>{
     setSelectedDoctor(doctors.find(doctor=> doctor.id === itemId))
   }
   //reder doctors
   const renderItem = ({item}) => {
        return(
           <TouchableNativeFeedback
                 background={TouchableNativeFeedback.SelectableBackground()}
                 onPress={()=> itemPressHandler(item.id)}
            >
                 <View style={styles.itemContainer}>
                <View style={styles.doctorAvatar}>
                    <Text style={styles.doctorAvatarText}>
                        {transformName(item.name)}
                    </Text>
                </View>
                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>
                        {item.Name}
                    </Text>
                    <Text style={styles.doctorSpec}>
                        {item.profile.specialization}
                    </Text>
                </View>

            </View>
           </TouchableNativeFeedback>
        )
   }
   const keyExtractor = (item) => item.id.toString()
   return (
        <View style={styles.container}>
         <Loader title="احضار الاطباء" loading={isLoading}/>
         <View style={styles.searchSection}>
            <View style={styles.searchInputContainer}>
                <Input
                    inputStyles={styles.searchInput}
                    placeholder="بحث عن طبيب"
                    icon="md-search"
                    onChangeText={search}
                />
            </View>
         </View>
         <DoctorDetails
            selectedDoctor={selectedDoctor}
            closeModal={()=> setSelectedDoctor(null)}
         />
         <SafeAreaView contentContainerStyle={styles.doctorsListContainer}>
            {doctors.length > 0 ? (
                <FlatList 
                    data={doctors}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            ): <Text style={styles.noDoctorsText}>لا يوجد أطباء</Text>

            }
         </SafeAreaView>
       </View>
    );
}



export default DoctorScreen;
