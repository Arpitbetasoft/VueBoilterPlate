
/*

import { ref, computed } from 'vue'
import CustomStore from 'devextreme/data/custom_store'
import userapi from './plugins/axios'
import { toast } from 'vue3-toastify'

const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value !== ''
}
export default function dataSource(url, params = {}, customRefName = null) {
  const skipLoader = ref(true)
  const dataGridRefName = customRefName ?? ref('dataGrid')
  const refKey = ref('dataGrid')
  const paginationOption = {
    visible: true,
    displayMode: 'compact',
    allowedPageSizes: [5, 10, 15, 20],
    childAllowedPageSizes: [7, 15, 25],
    showPageSizeSelector: true,
    showInfo: true,
    showNavigationButton: true,
    mobilePage: 5,
    defaultPage: 5,
  }
  const dataSource = new CustomStore({
    key: 'id',
    load: async function (loadOptions) {
      const dxKeys = ['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'sort', 'filter']
      let queryParams = params || {}

      // if (loadOptions.skip === 0) {
      //   params.requireTotalCount = true;
      // }

      Object.keys(params).forEach((key) => {
        if (dxKeys.includes(key)) {
          delete queryParams[key]
        }
      })

      dxKeys.forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          queryParams[i] = `${JSON.stringify(loadOptions[i])}`
        }
      })
      console.log('Query Params:', queryParams)
      return userapi
        .get(`/admin`, { params: queryParams })
        .then((response) => {
          console.log(response)
          if (skipLoader.value) {
            skipLoader.value = false
          }
          return {
            data: response.data.users,
            totalCount: response.data.total,
          }
        })
        .catch((error) => {
          if (skipLoader.value) {
            skipLoader.value = false
          }
          throw new Error('Data loading error: ' + error.message)
        })
    },

    insert: async function (values) {
      return userapi
        .post('/add', values)
        .then((response) => {
          console.log(response)
          if (response.data.status) {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Failed to add user')
          throw new Error('Error while adding record')
        })
    },

    update: async function (key, value) {
      console.log(key)
      return userapi
        .post('/update/', { key, value })
        .then(({ data }) => {
          console.log(data)
          if (data.status) {
            toast.success(data.message)
          } else {
            toast.error(data.message)
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Failed to update user')
          throw new Error('Error while updating record.')
        })
    },

    remove: async function (key) {
      return userapi
        .post('/delete', { key })
        .then((response) => {
          if (response.status) {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Failed to delete user')
          throw new Error('Error while deleting record.')
        })
    },
  })

  const refreshTable = (dataGridRef, changedOnly = false) => {
    if (!dataGridRef) {
      console.error('DataGrid ref not provided.')
      return
    }
    const dataGrid = dataGridRef.value.instance
    if (!dataGrid) {
      console.error('DataGrid instance not found.')
      return
    }

    dataGrid.refresh(changedOnly)
  }

  const getDataGridRefName = (ref_name) => {
    return (dataGridRefName.value = 'dataGrid_' + ref_name)
  }

  const refName = computed(() => {
    return getDataGridRefName(refKey.value)
  })

  const dxGrid = computed(() => {
    return dataGridRefName ? dataGridRefName.value.instance : null
  })

  return {
    dataGridRef: dataGridRefName,
    dxGrid,
    refName,
    dataSource,
    refKey,
    skipLoader,
    refreshTable,
    getDataGridRefName,
    paginationOption,
  }
}

*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------

import { ref, computed } from "vue";
import CustomStore from "devextreme/data/custom_store";
import userapi from "./plugins/axios";
import { toast } from "vue3-toastify";

const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value !== "";
};
export default function dataSource(
  url,
  params = {},
  customRefName = null,
) {
  const skipLoader = ref(true);
  const dataGridRefName = customRefName ?? ref("dataGrid");
  const refKey = ref("dataGrid");
  const format = { style: "currency", currency: "USD" };
  const dateFormat = "MM/dd/yyyy";
  const paginationOption = {
    visible: true,
    displayMode: "compact",
    allowedPageSizes: [5,10, 15, 20],
    childAllowedPageSizes: [7, 15, 25],
    showPageSizeSelector: true,
    showInfo: true,
    showNavigationButton: true,
    mobilePage: 5,
    defaultPage: 5,
  };
  const dataSource = new CustomStore({
    key:'id',
    byKey: async (key) => {
      return fetch(url + "?id=" + key);
    },
    load: async function (loadOptions) {
      const dxKeys = [
        "skip",
        "take",
        "requireTotalCount",
        "requireGroupCount",
        "sort",
        "filter",
      ];
      let queryParams = params || {};

      // if (loadOptions.skip === 0) {
      //   params.requireTotalCount = true;
      // }

      Object.keys(params).forEach((key) => {
        if (dxKeys.includes(key)) {
          delete queryParams[key];
        }
      });

      dxKeys.forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          queryParams[i] = `${JSON.stringify(loadOptions[i])}`;
        }
      });
      console.log("Query Params:", queryParams);
       return userapi
        .get(`/user/admin`, { params: queryParams })
        .then((response) => {
          console.log(response)
          if (skipLoader.value) {
            skipLoader.value = false
          }
          return {
            data: response.data.users,
            totalCount: response.data.total,
          }
        })
        . catch ((error)=> {
        console.error("Error loading data:", error);
        if (skipLoader.value) {
          skipLoader.value = false;
        }
        throw new Error("Data Loading Error");
      })
    },

    insert: async function (values) {
      userapi.post('/user/addUser',values).then((response)=>{
        if (response.data.status) {
            toast.success(response.data.message)
        }
        else if(response.data.status==409){
          toast.info(response.data.message)
        }
          else {
            toast.error(response.data.message)
          }
      })
      .catch ((error) =>{
        console.log(error)
        throw new Error("Error while adding record");
      })
    },

    update: async function (key, values) {
      return userapi
        .post('/user/updateUser', { key, values })
        .then(({ data }) => {
          console.log(data)
          if (data.status) {
            toast.success(data.message)
          } else {
            toast.error(data.message)
          }
        })
        . catch ((error)=> {
          console.log(error)
        throw new Error("Error while updating record.");
      })
    },

    remove: async function (key) {
      return userapi
        .post('/user/deleteUser', { key })
        .then((response) => {
          if (response.status) {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        })
        . catch ((error)=> {
          console.log(error)
        throw new Error("Error while deleting record.");
      })
    },
  });

  const refreshTable = (dataGridRef, changedOnly = false) => {
    if (!dataGridRef) {
      console.error("DataGrid ref not provided.");
      return;
    }
    const dataGrid = dataGridRef.value.instance;
    if (!dataGrid) {
      console.error("DataGrid instance not found.");
      return;
    }

    dataGrid.refresh(changedOnly);
  };

  const getDataGridRefName = (ref_name) => {
    return (dataGridRefName.value = "dataGrid_" + ref_name);
  };

  const refName = computed(() => {
    return getDataGridRefName(refKey.value);
  });

  const dxGrid = computed(() => {
    return dataGridRefName ? dataGridRefName.value.instance : null;
  });

  const isMobile = computed(() => {
    return window.innerWidth <= 768;
  });

  return {
    dataGridRef: dataGridRefName,
    dxGrid,
    format,
    refName,
    dataSource,
    refKey,
    skipLoader,
    refreshTable,
    getDataGridRefName,
    dateFormat,
    paginationOption,
    isMobile,
  };
}

