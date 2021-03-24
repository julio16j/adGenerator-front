
export function setUsuario (state, usuario) {
  state.usuario = usuario
  state.isAdmin = usuario.isAdmin
}
