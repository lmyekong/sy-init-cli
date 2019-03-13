const { prompt } = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');

const option = program.parse(process.argv).args[0];

module.exports = () => {

    // 列出已有项目名称
    fs.readdir('./', (err, files) => {
        const question = [{
				type: 'list',
				name: 'templateName',
				message: '请选择一个模板',
				choices: ['framework', 'subitem', 'onefold']
            },
            {
				type: 'input',
				name: 'name',
				message: '项目名称',
				default: '',
				filter(val) {
					return val.trim()
				},
				validate(val) {
					val = val.trim()
					if (!val) return '项目名称不能为空';
					if ((val.split(" ")).length > 1) return '项目名称不能有空格';
					if (files.includes(val)) return '项目名称已存在';
					return true
				},
				transformer(val) {
					return val;
				}
            },
            {
				type: 'input',
				name: 'description',
				message: '项目说明',
				default: 'Vue project',
				validate() {
					return true;
				},
				transformer(val) {
					return val;
				}
            },
            {
				type: 'input',
				name: 'author',
				message: 'Author',
				default: 'zero zhu',
				validate() {
					return true;
				},
				transformer(val) {
					return val;
				}
            }
        ];
        prompt(question).then(({ templateName, name, description, author }) => {
			const gitPlace = require('../templates')[templateName].path;
			const projectName = name;
			const spinner = ora('Downloading ' + templateName + ' please wait...' + gitPlace);

			spinner.start();
			// download(`${gitPlace}`, `./${projectName}`, (err) => {
			download(`${gitPlace}`, `${projectName}`, { clone: true }, (err) => {
				if (err) {
					console.log(chalk.red(err));
					process.exit()
				}

				fs.readFile(`./${projectName}/package.json`, 'utf8', function(err, data) {
					if (err) {
						spinner.stop();
						console.error(err);
						return;
					}

					const packageJson = JSON.parse(data);
					packageJson.name = name;
					packageJson.description = description;
					packageJson.author = author;

					fs.writeFile(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', function(err) {
						if (err) {
							spinner.stop();
							console.error(err);
							} else {
							spinner.stop();
							console.log(chalk.green('project init successfully!'))
							console.log(`
								${chalk.yellow(`cd ${name}`)}
								${chalk.yellow('npm install')}
								${chalk.yellow('npm run dev')}
							`);
						}
					});
				});
			})
		})
	})
}