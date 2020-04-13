import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));
    
    return (
        <View>
            <Text style={style.title}>{blogPost.title}</Text>
            <Text style={style.content}>{blogPost.content}</Text>
        </View>
    )
};

ShowScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => 
                navigation.navigate(
                    'Edit', 
                    {id: navigation.getParam('id') }
                )}>
                <EvilIcons name="pencil" size={30} />
            </TouchableOpacity>
        )
    };
};

const style = StyleSheet.create({
    title: {
        fontSize: 20,
        paddingVertical: 10,
        margin: 5
    },
    content: {
        fontSize: 14,
        margin: 5
    }
});

export default ShowScreen;