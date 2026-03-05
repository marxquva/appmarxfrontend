import axios from "axios"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import Swal from 'sweetalert2'

const API = "https://5a67bc704b1cdcba.mokky.dev"
export const useAppStore = create(
    
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            cart: [],
            URLAPI: "https://5a67bc704b1cdcba.mokky.dev",
            login: async (email, password) => {
                try {
                    set({
                        isLoading: true
                    })

                    const respuesta = await axios.get(`${API}/users?email=${email}&password=${password}`)
                    console.log("respuesta: ", respuesta)

                    if (respuesta?.data?.length > 0) {
                        set({
                            user: respuesta?.data?.[0]
                        })
                    }else{
                        Swal.fire({
                            title: 'Error',
                            text: "Error al iniciar sesión, verifique sus credenciales",
                            icon: 'error',
                        })
                    }
                }
                catch (err) {
                    console.log("err: ", err)
                    Swal.fire({
                        title: 'Error',
                        text: "Error al iniciar sesión, verifique sus credenciales",
                        icon: 'error',
                    })
                }
                finally {
                    set({
                        isLoading: false
                    })
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isLoading: false,
                    error: null
                })
            },
            hasRole: (roles) => {
                const currentRole = get().user
                if (currentRole === null) {
                    return false
                }
                if (Array.isArray(roles)) {
                    const hasRole = roles?.includes(currentRole.role)
                    return hasRole
                }
                return currentRole.role === roles
            },
            addToCart: (movie) => {
                set((state) => {
                    const existingItem = state.cart.find(item => item.movie.id == movie.id)
                    if (existingItem) {
                        Swal.fire({
                            title: "Ya tienes esta película en el carrito",
                            icon: "warning",
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        })
                        return {
                            cart: [...state.cart]
                        }
                    }
                    else {
                        Swal.fire({
                            title: "Se agrego película al carrito",
                            icon: "success",
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        })
                        return {
                            cart: [...state.cart, { movie, quantity: 1 }]
                        }
                    }
                })
            },
            updateQuantity: (movieId, newQuantity) => set((state) => ({
                cart: state.cart.map(item =>
                    item.movie.id == movieId ?
                        { ...item, quantity: Math.max(1, newQuantity) }
                        :
                        item
                )
            })),
            removeFromCart: (movieId) => set((state) => ({
                cart: state.cart.filter(item => item.movie.id !== movieId)
            })),
            clearCart: () => set(
                {
                    cart: []
                }
            )
        }),
        {
            name: "info-profile",
            storage: createJSONStorage(() => localStorage)
        }
    )
)