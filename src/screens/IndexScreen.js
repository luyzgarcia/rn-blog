import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IndexScreen = ({ navigation }) => {

    const {state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });
        return () => {
            listener.remove();
        };
    }, []);
    
    return (
        <View>
            <FlatList 
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id} )}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id} </Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather
                                    style={styles.icon} 
                                    name="trash"
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                }}
            />
        </View>
    )
};

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus"  style={styles.rightButton} />
            </TouchableOpacity>
    }
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    rightButton: {
        fontSize: 30,
        marginRight: 10
    }
});

export default IndexScreen;