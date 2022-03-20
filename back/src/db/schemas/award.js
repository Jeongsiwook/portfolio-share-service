import { Schema, model } from 'mongoose'

const AwardSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "설명이 아직 없습니다. 추가해 주세요.",
    },
},{
    timestamps: true,
})

const AwardModel = model('Award', AwardSchema)

export { AwardModel }