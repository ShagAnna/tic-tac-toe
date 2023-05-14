class ApiManager
{
  constructor(storage_name) {
    this.base_url = "https://bezkomisijas.lv/api-storage/04b4adf9e0d7aa663853530c26a5ba97/" + storage_name + "/";
  }

    getRequest (callback) {
        fetch(this.base_url + "?action=get-all")
        .then((response) => response.json())
        .then((result) => {
            if (result.status == true) {
            callback(result.entries);
            }
        });
    }

    create (form_data, callback) {
      this.postRequest('create', form_data, callback);
    }

    delete (id) {
      const form_data = new FormData();
      form_data.append('id', id);

      this.postRequest('delete', form_data);
    }

    postRequest (action, form_data, callback) {
        fetch(this.base_url + "?action=" + action, {
        method: 'post',
        body: form_data
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.status == true) {
            callback(result);
            }
        });
    }

    delete (id) {
        const form_data = new FormData();
        form_data.append('id', id);

        fetch(this.base_url + "?action=delete", {
          method: 'post',
          body: form_data
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status == true) {
              console.log(result);
            }
        });
    }
}