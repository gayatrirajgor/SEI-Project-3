/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {  getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'


const Cart = () => {

  const history = useHistory()
  const token = getTokenFromLocalStorage()

  const [userInfo,setuserInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { cart } } = await axios.get('/api/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        const cartItems = [...cart]
        const populated = await Promise.all(cartItems.map( async (item) => {
          try {
            const { data } = await axios.get(`/api/all/${item.item}`)
            return data
          } catch (error) {
            console.log(error)
          }
        }))
        setuserInfo(populated)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[token])

  console.log(userInfo)
  return (
    <h1>hello world</h1>
  )
}

export default Cart