import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Usuarios } from "./tasks.js";
import faker  from "faker";

if (Meteor.isServer) {
    describe("Usuarios", () => {
        describe("tasks.insert", () => {
            // Generate a random name
            const name = faker.name.findName();
            let currentUser;
            beforeEach(() => {
                Usuarios.remove({});

                // Stud the user
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: name,
                });
                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it("Debio Agregar un usuario con palabra", () => {

                Usuarios.insert({
                    name,
                    x:10,
                    y:10,
                    createdAt: new Date(),
                    owner: name,
                    username: "Felipe Iregui"
                });
            });
        });
    });
}