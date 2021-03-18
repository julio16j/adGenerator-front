<template>
  <div class="q-mx-md" >
    <q-card :style="cardStyle" :class="cardClass">
      <q-card-section class="row justify-between">
        <div :class="tituloStyle">
          {{ titulo }}
        </div>
        <div v-if="cadastrarBtn.mostraBotao" class="col-auto">
          <q-btn color="primary" no-caps icon="fas fa-plus" @click="cadastrarBtn.cadastrar"
            :label=" cadastrarBtn.label || 'Cadastrar'" />
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <simple-form :inputs="inputs" :submitButton="submitButton" />
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-table v-if="dataList.length > 0" :data="dataList" :columns="tableColumns"
        class="no-shadow q-pa-none" >
        <template v-slot:body-cell-acoes="props">
          <q-td :props="props">
            <div class="q-ml-sm q-mr-sm paddingBtns">
              <q-btn v-if="detalharBtn.mostraBotao" flat round
                @click="() => detalharBtn.detalhar(props.row)" >
                <q-icon name="fa fa-eye" style="font-size: 1em;" color="green-6" />
                <q-tooltip anchor="top middle" self="center middle">
                  {{ detalharBtn.label || 'Detalhar' }}
                </q-tooltip>
              </q-btn>
              <q-btn v-if="editarBtn.mostraBotao" flat round
                @click="() => editarBtn.editar(props.row)" >
                <q-icon name="fa fa-pencil-alt" style="font-size: 1em;" color="grey-8" />
                <q-tooltip anchor="top middle" self="center middle">
                  {{ editarBtn.label || 'Alterar' }}
                </q-tooltip>
              </q-btn>
              <q-btn v-if="excluirBtn.mostraBotao" flat round
                @click="() => excluirBtn.excluir(props.row)">
                <q-icon name="fa fa-ban" style="font-size: 1em;" color="red" />
                <q-tooltip anchor="top middle"
                  self="center middle">{{ excluirBtn.label || 'Excluir' }}</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

  </div>
</template>
<script>
import SimpleForm from '@/components/SimpleForm'
export default {
  name: 'ListagemComFiltro',
  components: { SimpleForm },
  props: {
    titulo: {
      type: String,
      default: 'Formulário'
    },
    tituloStyle: {
      type: String,
      default: 'text-h6 colorPrimary'
    },
    submitButton: {
      type: Object,
      required: true
    },
    cardStyle: {
      type: String,
      default: ''
    },
    cardClass: {
      type: String
    },
    inputs: {
      required: true
    },
    cancelButton: {
      type: Object,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true,
      default: () => []
    },
    dataList: {
      type: Array,
      required: true,
      default: () => []
    },
    excluirBtn: {
      type: Object,
      default: () => {
        return {
          excluir: () => {}
        }
      }
    },
    editarBtn: {
      type: Object,
      default: () => {
        return {
          editar: () => {}
        }
      }
    },
    detalharBtn: {
      type: Object,
      default: () => {
        return {
          detalhar: () => {}
        }
      }
    },
    cadastrarBtn: {
      type: Object,
      default: () => {
        return {
          cadastrar: () => {}
        }
      }
    }
  },
  data () {
    return {
      size: '5px'
    }
  }
}
</script>
