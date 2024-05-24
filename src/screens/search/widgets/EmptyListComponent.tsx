import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../../util/AppColors'

const EmptyListComponent = ({text}:{text:string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  )
}

export default EmptyListComponent

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    emptyText:{
        color:AppColors.onBackground,
        fontSize:18,
        fontWeight:'600',
    }
})