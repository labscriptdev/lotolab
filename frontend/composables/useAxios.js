/**
 * Install dependencies
 * yarn add -D axios
 */

import axios from "axios";
import { computed } from "vue";

export default (options = {}) => {
  options = {
    autoSubmit: false,
    url: false,
    method: false,
    params: {},
    data: {},
    response: false,
    events: [],
    filters: {},
    ...options,
  };

  ["url", "params", "method", "data"].map((attr) => {
    if (typeof options[attr] == "function") {
      options[attr] = computed(options[attr]);
    }
  });

  axios.defaults.headers["Content-Type"] = null;

  const r = reactive({
    ...options,
    ready: false,
    busy: false,
    error: false,
    success: false,
    t: false,

    errorField(field) {
      if (!r.error) return [];
      if (!r.error.fields) return [];
      return r.error.fields[field] || [];
    },

    submit() {
      if (r.busy) return;
      return new Promise((resolve, reject) => {
        if (r.t) {
          clearTimeout(r.t);
          r.t = false;
        }

        r.success = false;
        r.error = false;
        r.busy = true;
        r.dispatch("beforeSubmit");

        r.t = setTimeout(async () => {
          try {
            r.dispatch("submit");

            const resp = await axios({
              url: r.url,
              method: r.method,
              params: r.params,
              data: r.data,
            });

            r.dispatch("success", resp);
            r.dispatch("response", resp, false);
            r.response = r.filters.apply("response", resp).data;
            r.success = true;
            resolve(resp);
          } catch (err) {
            r.error = err.response ? err.response.data : { message: err.message };
            r.dispatch("error", r.error);
            r.dispatch("response", false, r.error);
            reject(err);
          }
          r.t = false;
          r.busy = false;
          r.ready = true;
        }, 1000);
      });
    },

    events: options.events,
    on(name, call) {
      this.events.push({ name, call });
    },
    dispatch(eventName, args = []) {
      this.events.map(({ name, call }) => {
        if (name != eventName) return;
        return call.apply(null, args);
      });
    },

    /**
     * const instance = useAxios({
     *  filters: {
     *    response(resp) {
     *      resp.data.data = resp.data.data.reverse();
     *      return resp;
     *    },
     *  },
     * });
     *
     * or
     *
     * instance.add('response', (resp) => {
     *    resp.data.data = resp.data.data.reverse();
     *    return resp;
     * });
     */
    filters: {
      ...options.filters,
      add(name, call) {
        r.filter.list[name] = call;
      },
      apply(name, value) {
        const ignore = ["add", "apply"];
        if (typeof r.filters[name] == "function" && !ignore.includes(name)) {
          return r.filters[name](value);
        }
        return value;
      },
    },
  });

  r.dispatch("init");

  if (r.autoSubmit) {
    r.submit();
  }

  return r;
};
