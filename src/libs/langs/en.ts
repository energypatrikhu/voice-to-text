let enLang = {
	speechFeedback: {
		index: {
			appStarted: 'Application started!',
			updater: {
				updateAvailable: 'There is an update available! Please restart the application to start the update!',
			},
		},

		commandHandler: {
			unknownMacro: 'Unknown macro!',
			unknownCommand: 'Unknown command!',
		},

		commands: {
			updateApp: {
				updateAvailabe: 'Update available! Please wait, updating application...',
			},

			showActiveButtons: {
				showActiveButtons: {
					enabled: 'Show active buttons: Enabled',
					disabled: 'Show active buttons: Disabled',
				},
			},

			mtaMode: {
				mtaConsoleInputMode: {
					enabled: 'MTA Console Input Mode: Enabled',
					disabled: 'MTA Console Input Mode: Disabled',
				},
			},

			exitMta: {
				notInForeground: 'MTA San Andreas is not in foreground!',
			},

			exit: {
				closingApp: 'Closing voice to text application...',
			},

			delete: {
				removedChars: 'Removed {0} characters!',
				removedWords: 'Removed {0} words!',
			},

			activeWindow: {
				activeWindow: 'Active window: {0}',
			},
		},
	},

	textFeedback: {
		index: {
			app: {
				loading: 'Loading app, please wait...',
				version: 'App version: {0}',
				started: {
					hold: 'Voice To Text app started, press and hold one of the defined keyboard shortcuts to use voice-to-text',
					toggle: 'Voice To Text app started, press one of the defined keyboard shortcuts to toggle voice-to-text',
				},
			},
			chrome: {
				starting: 'Starting chrome in headless mode...',
				initializing: 'Initializing chrome instance...',
			},
			updater: {
				starting: 'Starting auto update checker...',
				updateAvailable: 'There is an update available! Please restart the application to start the update!',
			},
			registering: {
				ioHook: 'Registering io hook...',
				commands: 'Registering commands...',
			},
			keyPressed: 'Pressed: {0}',
			activeButtons: 'Active buttons: {0}',
			creatorsCredits: {
				wrapper: '> = = = = = < creators & credits > = = = = = <',
				createdBy: ' Created By: EnergyPatrikHU (https://energypatrik.hu)',
				ideaBy: ' Idea By: HUMROLI1 (https://humroli1.hu)',
			},
			commandsEnabled: "Say or write '{0}parancsok' to list available commands!",
		},

		soundWrapper: {
			playingSound: 'Playing sound...',
		},

		getChromeInstallLocation: {
			chrome: {
				cannotFind: 'Cannot find chrome at custom path, searching default paths...',
			},
		},

		config: {
			macro: {
				notExists: 'Macro config file does not exists, creating new macro config file!',
			},
			config: {
				wrapper: '> = = = = = < config > = = = = = <',
				broken: 'Config error! The config file seems to be broken, re-creating!',
				notExists: 'Config error! The config file does not exists, creating new config file!',
				loaded: 'Config loaded!',
				error: {
					partialHoldToActivate: 'Config error! `output.partial` cannot be `true` while `input.holdToActivate` is `true`!',
					punctuationMarksPartial: 'Config error! `replacers.punctuationMarks` cannot be `true` while `output.partial` is `true`!',
					gameChatPrefixesPartial: 'Config error! `replacers.gameChatPrefixes` cannot be `true` while `output.partial` is `true`!',
					commandsPartial: 'Config error! `commands.enabled` cannot be `true` while `output.partial` is `true`!',
				},
			},
		},

		commandHandler: {
			unknownMacro: 'Unknown macro!',
			unknownCommand: 'Unknown command!',
		},

		chromeInstance: {
			chrome: {
				navigating: 'Navigating chrome...',
				registeringEvents: 'Registering chrome events...',
			},
			exposingPageFunctions: 'Exposing page functions...',
			speechRecognition: {
				starting: 'Starting speech recognition engine...',
			},
		},

		update: {
			checkAppUpdate: {
				checkingUpdate: 'Checking for update...',
				upToDate: 'App is up to date!',
				notUpToDate: 'App is not up to date! Please wait, updating application...',
			},
			checkUpdater: {
				downloading: 'Downloading voice-updater...',
				unzipping: 'Unzipping voice-updater...',
				updated: 'Updated voice-updater!',
				upToDate: 'voice-updater is up to date!',
				notUpToDate: 'voice-updater is not up to date!',
			},
		},

		commands: {
			updateApp: {
				description: 'Check for an update to the app.',
				checkingUpdate: 'Checking for update...',
				noUpdateAvailabe: 'No update available.',
				updateAvailabe: 'Update available! Please wait, updating application...',
			},

			showActiveButtons: {
				description: 'Prints the list of active buttons, useful for setting the desired button combination to activate voice-to-text.',
				showActiveButtons: {
					enabled: 'Show active buttons: Enabled',
					disabled: 'Show active buttons: Disabled',
				},
			},

			mtaMode: {
				description: 'Sets it to the opposite of the current value of `mtaConsoleInputMode`. (true => false | false => true)',
				mtaConsoleInputMode: {
					enabled: 'MTA Console Input Mode: Enabled',
					disabled: 'MTA Console Input Mode: Disabled',
				},
			},

			exitMta: {
				description: 'Closes the MTA San Andreas program.',
				notInForeground: 'MTA:SA is not in foreground!',
			},

			exit: {
				description: 'Close this program.',
				closingApp: 'Closing voice to text application...',
			},

			delete: {
				description: 'Deleting words and their letters, e.g.: !delete:3:letter => 3 letters are deleted.',
				removedChars: 'Removed {0} characters!',
				removedWords: 'Removed {0} words!',
			},

			commandList: {
				description: 'Command list.',
				list: {
					wrapper: '> = = = = = < commands > = = = = = <',
					name: ' Name:',
					availability: ' Availability:',
					syntax: ' Syntax:',
					description: ' Description:',
				},
				availabilityMap: {
					both: 'text & speech',
					text: 'text only',
					speech: 'speech only',
				},
			},

			activeWindow: {
				description: 'Get the currently foreground window.',
				activeWindow: 'Active Window: {0}',
			},
		},

		chromeFunctions: {
			speechRecognition: {
				outputStopped: "Output stopped by pressing 'Escape'!",
				start: {
					outputPrefix: 'outputPrefix: {0}',
				},
				info: {
					started: 'speechRecognition started',
					stopped: 'speechRecognition stopped',
					restarted: 'speechRecognition restarted',
					output: 'output: {0}',
				},
				transcript: {
					partialOutput: 'partialOutput: {0}',
				},
			},
		},
	},
};

export default enLang;
