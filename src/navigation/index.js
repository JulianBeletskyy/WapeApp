import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ProductListScreen from '../screens/ProductList'
import OrderScreen from '../screens/Order'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          options={{
            title: 'Sales'
          }}
          component={ProductListScreen} />
        <Stack.Screen
        name="Order"
        options={{
          headerBackTitleVisible: false,
        }}
        component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation