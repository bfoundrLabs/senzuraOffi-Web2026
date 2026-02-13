// @ts-nocheck
import mongoose from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
  order: number;
  active: boolean;
  createdAt: Date;
}

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const TeamMember = (mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamMemberSchema)) as any;
export default TeamMember;
