import httpClient from '@/http'
import ICompany from '@/interfaces/ICompany'
import ICompanyCard from '@/interfaces/ICompanyCard'
import INewCompany from '@/interfaces/INewCompany'
import IPhotoUpload from '@/interfaces/IPhotoUpload'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'

interface Estado {
  companiesCard: ICompanyCard[],
  companySelected: ICompany[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    companiesCard: [],
    companySelected: []
  },
  getters: {
  },
  mutations: {
    'REMOVE_COMPANY'(state, id: number){
      state.companiesCard = state.companiesCard.filter(x => x.id != id)
    },
    'SET_COMPANIES_CARD'(state, companies: ICompanyCard[]){
      state.companiesCard = companies
    },
    'SET_COMPANY'(state, company: ICompany){
      state.companySelected.push(company)
    },
    'CLEAN_COMPANY'(state) {
      state.companySelected = []
    }
  },
  actions: {
    'UPDATE_STATUS_COMPANY'(context, { companyId, newStatus}) {
      httpClient.put('api/company/status', 
      { 
        companyId,
        newStatus
      }).then(response => console.log(response.data))
    },
    'GET_COMPANIES'({commit}) {
      httpClient.get('api/Company/all')
        .then(resposta => {
          const companiesCard: ICompanyCard[] = []
          const companies: ICompany[] = resposta.data.companies

          companies.forEach(company => {
            const photoThumb = company.photos.find(x => x.isThumb);
            
            const companyCard: ICompanyCard = {
              id: company.id,
              name: company.name,
              status: company.status,
              document: company.document,
              thumbUrl: photoThumb?.url || ""
            }

            companiesCard.push(companyCard)
          })

          commit('SET_COMPANIES_CARD', companiesCard)
        })
    },
    'PHOTO_UPLOAD'(context, photo: IPhotoUpload) {
      const formData = new FormData();
      let isThumb : string;

      if(photo.isThumb)
        isThumb = "true"
      else 
        isThumb = "false"

      formData.append("file", photo.file);
      formData.append("companyId", photo.companyId.toString())
      formData.append("IsThumb", isThumb)

      httpClient.post('api/photo', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => console.log(response.data))
    },
    'SAVE_COMPANY'(context, company: INewCompany) {
      const request = {
        company: {
          document: company.document,
          legalName: company.legalName,
          fantasyName: company.fantasyName,
          name: company.name
        }
      }

      httpClient.post('/api/company', request)
        .then(response => console.log(response.data))
    },
    'GET_COMPANY'({ commit }, id: number) {
      httpClient.get(`api/company/${id}`)
         .then(response => {
            commit('SET_COMPANY', response.data.company)
         })
    },
    'DELETE_COMPANY'({ commit }, id: number) {
      console.log("id: " + id)
      httpClient.delete(`api/company/${id}`)
        .then(response => {
          console.log(response)
          commit('REMOVE_COMPANY', id)
        });
    },
  },
  modules: {
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key);
}