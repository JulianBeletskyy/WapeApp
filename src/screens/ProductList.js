import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Pressable, Text, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getProducts, getImages } from '../api'

import ProductItem from '../components/ProductItem'

const ProductListScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refreshList()
  }, [])

  const refreshList = async () => {
    setRefreshing(true)
    const res = await getProducts()
    setProducts(res.rows.map(el => ({...el, countInCart: 0})))

    const promises = res.rows.map(product => {
      return getImages(product.images.meta.href).then(res => ({[product.id]: res.rows}))
    })
    Promise.all(promises).then(res => {
      const objImages = res.reduce((acc, item) => ({...acc, ...item}), {})
      setProducts(state => {
        return state.map(product => {
          return {
            ...product,
            images: objImages[product.id] || []
          }
        })
      })
    })

    setRefreshing(false)
  }

  const handlePressProduct = product => {
    console.log(product)
  }

  const handlePressCart = () => {
    navigation.navigate('Order', {products})
  }

  const handleChangeCartValue = (productId, value) => {
    setProducts(state => {
      return state.map(product => {
        if (productId === product.id) {
          product.countInCart = value
        }
        return product
      })
    })
  }

  const renderProductItem = ({item, index}) => {
    return (
      <View style={{marginBottom: 10}}>
        <ProductItem product={item} onPress={handlePressProduct} onChange={handleChangeCartValue} />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        contentContainerStyle={{paddingVertical: 25}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshList} />}
        renderItem={renderProductItem} />
      <Pressable style={[styles.cartButton, {bottom: insets.bottom}]} onPress={handlePressCart}>
        <Text style={{fontSize: 36}}>🛒</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 70/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})

export default ProductListScreen