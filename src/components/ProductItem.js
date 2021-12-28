import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import numeral from 'numeral'

const ProductItem = ({product, onPress, onChange}) => {
  const image = product.images?.[0]?.meta?.downloadHref
  const price = product.salePrices?.[0]?.value
  return (
    <Pressable style={styles.container} onPress={() => onPress(product)}>
      <FastImage
        source={{
          uri: image,
          headers: { Authorization: 'Basic YWRtaW5AeXVyYWx5c3lzaGFrOjU5MDhmNjFkZDE' },
          priority: FastImage.priority.normal,
        }}
        style={styles.image} />
      <View style={{height: '100%'}}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text>{numeral(price/100).format('0.00')} UAH</Text>
      </View>
      <View style={styles.counter}>
        <Pressable style={styles.counterButton} onPress={() => onChange(product.id, product.countInCart ? product.countInCart-1 : 0)}>
          <Text style={{fontWeight: '700'}}>-</Text>
        </Pressable>
        <Text style={styles.cartValue}>{product.countInCart}</Text>
        <Pressable style={styles.counterButton} onPress={() => onChange(product.id, product.countInCart+1)}>
          <Text style={{fontWeight: '700'}}>+</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 24
  },
  description: {
    
  },
  counter: {
    marginLeft: 'auto',
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    padding: 2,
    borderRadius: 20
  },
  cartValue: {
    width: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  counterButton: {
    width: 25,
    height: 25,
    borderRadius: 25/2,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProductItem