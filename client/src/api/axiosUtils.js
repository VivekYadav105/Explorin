import axios,{isAxiosError} from 'axios'

const axiosInstance = (config)=> {
    const fetcherInstance = axios.create({
        baseURL:import.meta.env.VITE_BACKEND_URI,
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        ...config
    })
    
    fetcherInstance.interceptors.request.use(config => {
        if(!config.headers.Authorization){
          const token = localStorage.getItem('token');
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
        return config;
    }, error => Promise.reject(error));
    
    fetcherInstance.interceptors.response.use(
        (res)=>res,
        (error) => {
          console.log(error);
          if (isAxiosError(error)) {
              if(error.status==403) localStorage.removeItem('token')
              if(error.code!='ERR_NETWORK')
                error.message = error.response?.data.message || 'Trouble with Network.';
          }
          return Promise.reject(error);
        }
    )

    return fetcherInstance
}

export default axiosInstance