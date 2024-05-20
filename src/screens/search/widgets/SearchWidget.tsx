import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6';

type Props = {
    onTextChange: (text: string) => void
};

const SearchWidget = ({ onTextChange }: Props) => {    
    return (
        <View style={styles.searchBarContainer}>
            <Icon name='magnifying-glass' color={'#FFFBFB'} size={20} />
            <TextInput placeholder='Search games, show...'
                placeholderTextColor={'white'}
                style={styles.searchBarTextField}
                onChangeText={onTextChange}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    searchBarContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 17,
        backgroundColor: '#433C3C',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchBarTextField: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 15,
        color: 'white'
    }
});


export default SearchWidget;