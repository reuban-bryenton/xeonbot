const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks a user',

    permissions: ['KICK_MEMBERS'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members.first() : interaction.options.getMember('user')
        if (!target) {
            return {
                custom: true,
                content: 'Please mention a user!',
                ephmeral: true
            }
        }
        if (!target.kickable) {
            return {
                custom: true,
                content: 'I cannot kick this user!',
                ephmeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)
        let embed = new MessageEmbed()
        .setTitle('User Kicked')
        .setColor('#ff0000')
        .addField('User:', `${target.username} *(${target.name}#${target.discriminator})*`)
        message.guild.channels.cache.find(c => c.id === '865780332984139776').send({ embeds: [embed] })
        return {
            custom: true,
            content: `Kicked ${target.user.tag} for ${reason}`,
            ephmeral: true
        }

    },
}