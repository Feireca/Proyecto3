import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

export const Usuarios = new Mongo.Collection('Usuario');

const userId = Random.id();

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function tasksPublication() {
        return Usuarios.find();
    });
}

Meteor.methods({
    'tasks.insert'(nombre, x, y) {
        check(nombre, String);
        Usuarios.insert({
            nombre,
            x,
            y,
            createdAt: new Date(),
            owner: userId,
            username: "Felipe Iregui",
        });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Usuarios.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});