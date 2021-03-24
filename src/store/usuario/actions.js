
export function setUsuario (context, usuario) {
  context.commit('setUsuario', usuario)
}
export function clearUsuario (context) {
  context.commit('setUsuario', { isAdmin: false })
}
