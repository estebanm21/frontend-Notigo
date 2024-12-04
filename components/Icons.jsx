
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export const BackIcon = (props) => {
    return (
        <AntDesign name="leftcircle" size={props.size} color={props.color} {...props} />
    )
}

export const HomeIcon = (props) => {
    return (
        <FontAwesome5 name="home" size={props.size} color={props.color} {...props} />
    )
}

export const StoreIcon = (props) => {
    return (
        <MaterialCommunityIcons name="storefront" size={props.color} color={props.color} {...props} />
    )
}

export const NotificationIcon = (props) => {
    return (
        <Entypo name="notification" size={props.size} color={props.color} {...props} />
    )
}

export const UserIcon = (props) => {
    return (
        <FontAwesome name="user-circle" size={props.size} color={props.color} {...props} />
    )
}

export const PlusIcon = (props) => {
    return (
        <AntDesign name="plussquare" size={props.size} color={props.color} {...props} />
    )
}

export const PinIcon = (props)=>{
    return(
        <Entypo name="location-pin" size={props.size} color={props.color}  {...props} /> 
    )
}

export const Ellipsis = (props)=>{
    return(
        <FontAwesome6 name="ellipsis-vertical" size={props.size} color={props.color} {...props} />
    )
}

export const BellIcon = (props)=>{
    return(
        <FontAwesome name="bell" size={props.size} color={props.color} {...props} />
    )
}