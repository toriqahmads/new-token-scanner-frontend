import axios from 'axios'

const getTokenList = async(network = 'bsc', payload = {
  start_date: '', end_date: '', last_visible: ''
}) => {
  try {
    let { start_date, end_date, last_visible } = payload
    if (!start_date || start_date == '') start_date = new Date().toISOString().slice(0, 10)
    if (!end_date || end_date == '') end_date = new Date().toISOString().slice(0, 10)

    const params = {
      start_date,
      end_date
    }

    if (last_visible && last_visible != '') params.last_visible = last_visible

    let endpoint = process.env.VUE_APP_ENDPOINT_API
    endpoint += process.env.VUE_APP_API_VERSION ? `/${process.env.VUE_APP_API_VERSION}` : ''

    const token_list = await axios.get(`${endpoint}/tokens/${network}`, {
      params,
    })

    return Promise.resolve(token_list.data.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default getTokenList
