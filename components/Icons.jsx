
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';




export const BackIcon = (props) => {
    return (
        <AntDesign name="leftcircle" size={props.size} color={props.color} {...props} />
    )
}

export const HomeIcon = (props) => {
    return (


        <SimpleLineIcons name="home" size={props.size} color={props.color} {...props} />
    )
}

export const StoreIcon = (props) => {
    return (


        <SimpleLineIcons name="handbag" size={props.color} color={props.color} {...props} />
    )
}

export const NotificationIcon = (props) => {
    return (

        <SimpleLineIcons name="bell" size={props.size} color={props.color} {...props} />
    )
}

export const UserIcon = (props) => {
    return (

        <SimpleLineIcons name="user" size={props.size} color={props.color} {...props} />
    )
}

export const PlusIcon = (props) => {
    return (

        <SimpleLineIcons name="plus" size={props.size} color={props.color} {...props} />
    )
}

export const PinIcon = (props) => {
    return (
        <Entypo name="location-pin" size={props.size} color={props.color}  {...props} />
    )
}

export const Ellipsis = (props) => {
    return (
        <FontAwesome6 name="ellipsis-vertical" size={props.size} color={props.color} {...props} />
    )
}

export const BellIcon = (props) => {
    return (
        <FontAwesome name="bell" size={props.size} color={props.color} {...props} />

    )
}

export const NotificationBellIcon = (props) => {
    return (


        <SimpleLineIcons name="badge" size={props.size} color={props.color} {...props} />
    )
}