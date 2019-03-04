<template>
  <b-modal id="createEntityModal"
           ref="modal"
           size="lg"
           hide-footer
           centered>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group id="entityNameLabel"
                    :label="`Название  ${entityInputName}`"
                    label-for="entityName">

        <b-form-input id="entityName"
                      type="text"
                      v-model="entity.name"
                      :state="nameState"
                      aria-describedby="entityNameLiveFeedback"
                      oninvalid="this.setCustomValidity('Введите название')"
                      :placeholder="`Введите название  ${entityInputName}`">
        </b-form-input>

        <b-form-invalid-feedback id="entityNameLiveFeedback">
          Введите не менее 10 символов
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="entityDescriptionLabel"
                    :label="`Описание  ${entityInputName}`"
                    label-for="entityDescription">

        <b-form-textarea id="entityDescription"
                         v-model="entity.description"
                         :state="descriptionState"
                         aria-describedby="entityDescriptionLiveFeedback"
                         :placeholder="`Введите описание ${entityInputName}`"
                         rows="3">
        </b-form-textarea>

        <b-form-invalid-feedback id="entityDescriptionLiveFeedback">
          Введите не менее 25 символов
        </b-form-invalid-feedback>
      </b-form-group>

      <b-btn type="submit" size="sm" class="form-button">
        Создать {{ entityButtonName }}
      </b-btn>
      <b-btn type="reset" size="sm" class="form-button" variant="danger" @click="handleClose">
        Отменить
      </b-btn>
    </b-form>

    <div slot="modal-header" class="modal-header-class">
        <h4 class="modal-header-text">Создание {{ entityInputName }}</h4>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalCreateComponent',

  props: ['entityUrlName', 'entityInputName', 'entityButtonName'],

  data () {
    return {
      entity: {
        name: '',
        description: ''
      },
      startValidate: false
    }
  },

  computed: {
      nameState() {
        if (this.startValidate) {
          return this.entity.name.length > 10 ? true : false
        }
      },

      descriptionState() {
        if (this.startValidate) {
          return this.entity.description.length > 25 ? true : false
        }
      }
    },

  methods: {
    handleClose () {
      this.entity.name = '';
      this.entity.description = '';
      this.startValidate = false;
      this.$refs.modal.hide();
    },

    handleSubmit () {
      this.startValidate = true;
      if (this.nameState && this.descriptionState) {
        this.$http.post(
          `/${this.entityUrlName}`,
          this.entity
        )
          .then(() => {
            this.$emit('created')
            this.entity.name = ''
            this.entity.description = ''
            this.startValidate = false;
            this.$refs.modal.hide()
          })
          .catch(error => {
            console.log(error)
            alert('Ошибка при создании')
          })
      }
    }
  }
}
</script>

<style scoped>
  .form-button {
    margin: 15px 0px 5px 10px;
    float: right;
  }

  .modal-header-class {
    margin: auto;
  }
  
  .modal-header-text {
    font-size: 25px;
    font-weight: 500;
    color: #2c3e50;
  }
</style>
