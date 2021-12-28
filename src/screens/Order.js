import React from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import numeral from 'numeral'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const OrderScreen = ({navigation, route}) => {
  const { products } = route.params
  const insets = useSafeAreaInsets()

  const productsInCart = products.filter(product => product.countInCart)
  const total = productsInCart.reduce((acc, product) => {
    return acc += product.countInCart * (product.salePrices?.[0]?.value ?? 0)
  }, 0)

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <View>
        {
          productsInCart.map((product, i) => {
            const price = product.salePrices?.[0]?.value ?? 0
            return (
              <View key={i} style={{flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', paddingVertical: 5}}>
                <Text style={{flex: 0.8}}>{product.name}</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{width: '15%'}}>{product.countInCart} x </Text>
                  <Text style={{width: '35%'}}>{numeral(price/100).format('0.00')}</Text>
                  <Text style={{width: '50%', textAlign: 'right'}}>{numeral(product.countInCart*price/100).format('0.00')} UAH</Text>
                </View>
              </View>
            )
          })
        }
      </View>
      <Text style={styles.title}>Total: {numeral(total/100).format('0.00')} UAH</Text>
      <TextInput style={styles.input} placeholder={'Your Name'} />
      <TextInput style={styles.input} placeholder={'+380 (99) 999 - 99 - 99'} />
      <TextInput style={styles.input} placeholder={'Delivery Address'} />
      <Text>PAYMENT METHOD</Text>
      <Pressable style={styles.submitButton}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 25
  },
  input: {
    width: '100%',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  submitButton: {
    borderWidth: 1,
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 5,
  }
})

export default OrderScreen