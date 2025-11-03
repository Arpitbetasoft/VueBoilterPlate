<template>
  <v-container>
    <h1>Admin Page</h1>

    <DxDataGrid
      :data-source="dataSource"
      :on-editor-preparing="onEditorPreparing"
      key-expr="username"
      :show-borders="true"
      :column-auto-width="true"
      :row-alternation-enabled="true"
      :remote-operations="{ paging: true, filtering: true, sorting: true }"
      :filter-row="{ visible: true }"
    >
      <DxSearchPanel :visible="true" :highlight-search-text="true" />
      <DxHeaderFilter :visible="true" />
      <DxGroupPanel :visible="true" />

      <DxColumn data-field="username" caption="Name" />
      <DxColumn data-field="email" caption="Email" />
      <DxColumn data-field="pass" caption="Password" />
      <DxColumn data-field="role" caption="Role" />

      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :use-icons="true"
      />

      <DxPaging :page-size="paginationOption.defaultPage" />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="paginationOption.allowedPageSizes"
        :show-navigation-buttons="true"
        :show-info="true"
        :visible="true"
      />
    </DxDataGrid>
  </v-container>
</template>

<script setup>
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxSearchPanel,
  DxGroupPanel,
} from 'devextreme-vue/data-grid'

import useAdminDataSource from '@/useAdminDataSource'

const { dataSource, paginationOption } = useAdminDataSource()

function onEditorPreparing(e) {
  if (e.parentType === 'dataRow' && e.row && !e.row.isNewRow) {
    if (['username', 'email', 'pass'].includes(e.dataField)) {
      e.editorOptions.disabled = true
    }
  }
}
</script>

<style scoped>
</style>


 //-----------------------------------------------------------------------------------------------------------------------------------------------------------------



<!--
 <template>
  <v-container>
    <h1>Admin Page</h1>

    <DxDataGrid
      :data-source="customDataSource"
      key-expr="id"
      :show-borders="true"
      :column-auto-width="true"
      :row-alternation-enabled="true"
      :remote-operations="true"
    >

      <DxSearchPanel :visible="true" :highlight-search-text="true" />
      <DxHeaderFilter :visible="true" />
      <DxColumn data-field="username" caption="Name" />
      <DxColumn data-field="email" caption="Email" />
      <DxColumn data-field="pass" caption="Password" />
      <DxColumn data-field="role" caption="Role" />
      <DxGroupPanel :visible="true" />
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :use-icons="true"
      />

      <DxPaging :page-size="5" />
      <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 15, 20]" />
    </DxDataGrid>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CustomStore from 'devextreme/data/custom_store'

import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxSearchPanel,
  DxGroupPanel,
} from 'devextreme-vue/data-grid'
import userapi from '@/plugins/axios'

const users = ref([])

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  userapi.get('/admin').then(({ data }) => {
    console.log(data)
    users.value = data.users
  })
}

const customDataSource = new CustomStore({
  key: 'id',
  load: (loadOptions) => {
    // Construct the URL with pagination and filtering parameters
    const params = new URLSearchParams()
    if (loadOptions.skip) {
      params.append('skip', loadOptions.skip)
    }
    if (loadOptions.take) {
      params.append('take', loadOptions.take)
    }

    console.log(loadOptions)

    return userapi
      .get(`/admin?${params.toString()}`)
      .then((response) => {
        console.log(response)
        return {
          data: response.data.users,
          totalCount: response.data.totalCount, // The backend must provide this
        }
      })
      .catch((error) => {
        throw new Error('Data loading error: ' + error.message)
      })
  },
  insert: (values) => {
    return userapi.post('/add', values)
  },
  update: (key, values) => {
    // Include the key in the payload to identify the record
    console.log(values)
    return userapi.post('/update', { ...values, id: key })
  },
  remove: (key) => {
    // Send the key to identify the record
    return userapi.post('/delete', { id: key })
  },
})

// const addUser = (e) => {
//   userapi
//     .post('/add', e.data)
//     .then(({ data }) => {
//       console.log(data, 'User Added')
//       toast.success('User Added')
//       users.value = data.users
//       fetchData()
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const updateUser = (e) => {
//   console.log(e.data)
//   userapi
//     .post('/update', e.data)
//     .then(({ data }) => {
//       if (data.status == true) {
//         console.log(data, 'User updated')
//         toast.success('User Updated')
//         users.value = data.users
//         fetchData()
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const deleteUser = (e) => {
//   userapi
//     .post('/delete', { username: e.data.username })
//     .then(({ data }) => {
//       console.log(data)
//       users.value = data.users
//       fetchData()
//       toast.success('User Deleted')
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
</script>


<style scoped>
.dx-datagrid {
  margin-top: 20px;
}

:deep .dx-datagrid-filter-row .dx-editor-container {
  height: auto;
  padding-top: 4px;
  padding-bottom: 4px;
}

:deep .dx-datagrid-filter-row .dx-texteditor-input {
  min-height: auto;
  line-height: normal;
  padding-top: 0;
  padding-bottom: 0;
}

:deep .dx-datagrid-filter-row td {
  padding: 0 8px;
  vertical-align: middle;
}
</style>

 -->
