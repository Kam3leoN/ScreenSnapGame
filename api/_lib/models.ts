import mongoose, { Schema, type InferSchemaType } from "mongoose";

const gameSchema = new Schema(
  {
    legacyId: { type: Number, index: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: false }
);

const settingSchema = new Schema(
  {
    level: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    time: { type: Number, required: true },
    lives: { type: Number, required: true },
    choices: { type: Number, required: true },
    fifty: { type: Boolean, required: true },
    switch: { type: Boolean, required: true },
    fiftyUses: { type: Number, default: 1 },
    switchUses: { type: Number, default: 0 },
  },
  { timestamps: false }
);

const scoreSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    hiscore: { type: Number, required: true },
    level: { type: String, required: true },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export type GameDoc = InferSchemaType<typeof gameSchema>;
export type SettingDoc = InferSchemaType<typeof settingSchema>;
export type ScoreDoc = InferSchemaType<typeof scoreSchema>;

export const GameModel =
  mongoose.models.Game ?? mongoose.model("Game", gameSchema, "games");
export const SettingModel =
  mongoose.models.Setting ?? mongoose.model("Setting", settingSchema, "settings");
export const ScoreModel =
  mongoose.models.Score ?? mongoose.model("Score", scoreSchema, "scores");
