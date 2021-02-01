import {React} from 'react';
import {
    Text,
    View,

} from 'react-native';


export default function SpecialTaskListItem({ entity }) {
    return(
        <View style={
            {
                backgroundColor: '#f9c2ff',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }
            }>
            <Text
                onPress={() => entity.id++}
                style={{fontSize: 24}}>
                {entity.name} {entity.id}
            </Text>
        </View>
    );
};