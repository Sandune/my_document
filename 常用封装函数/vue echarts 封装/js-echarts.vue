<template lang="jade">
    div(:id='id', :data='data')
</template>

<script>
export default {
    name: '',
    data(){
        return {
            echarts: null,
        }
    },
    watch:{
        data:{
            handler(newValue, oldValue){
                this.darwLineGraph(this.id,newValue);
            },
            deep:true
        }
    },
    props:['id','data'],
    mounted:function(){
        this.darwLineGraph(this.id,this.data)
    },
    methods:{
        darwLineGraph(id,data){
            
            let _this = this
            let mychar = document.getElementById(id)
            this.echarts = this.$echarts.init(mychar)
            this.echarts.setOption(data)
            window.addEventListener('resize', function(){
                _this.echarts.resize()
            })
        }
    },
    beforeDestroy(){
        if(this.echarts){
            this.echarts.clear()
        }
    }
}
</script>

<style scoped>

</style>
