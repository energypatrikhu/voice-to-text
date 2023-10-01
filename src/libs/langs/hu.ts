let huLang = {
	speechFeedback: {
		index: {
			appStarted: 'Az alkalmazás elindult!',
			updater: {
				updateAvailable: 'Van egy frissítés! Kérjük, indítsa újra az alkalmazást a frissítés elindításához!',
			},
		},

		commandHandler: {
			unknownMacro: 'Ismeretlen makró!',
			unknownCommand: 'Ismeretlen parancs!',
		},

		commands: {
			updateApp: {
				updateAvailabe: 'Frissítés elérhető! Kérjük, várjon, az alkalmazás frissítése folyamatban...',
			},

			showActiveButtons: {
				showActiveButtons: {
					enabled: 'Aktív gombok megjelenítése: Engedélyezve',
					disabled: 'Aktív gombok megjelenítése: Letiltva',
				},
			},

			mtaMode: {
				mtaConsoleInputMode: {
					enabled: 'MTA konzol beviteli mód: Engedélyezve',
					disabled: 'MTA konzol beviteli mód: Letiltva',
				},
			},

			exitMta: {
				notInForeground: 'Az MTA San Andreas nincs előtérben!',
			},

			exit: {
				closingApp: 'Az alkalmazás bezárása folyamatban...',
			},

			delete: {
				removedChars: '{0} karakter eltávolítva!',
				removedWords: '{0} szó eltávolítva!',
			},

			activeWindow: {
				activeWindow: 'Aktív ablak: {0}',
			},
		},
	},

	textFeedback: {
		index: {
			app: {
				loading: 'Alkalmazás betöltése, kérjük, várjon...',
				version: 'Alkalmazás verziója: {0}',
				started: {
					hold: 'A Voice To Text alkalmazás elindult, nyomja meg és tartsa lenyomva az egyik meghatározott billentyűparancsot az alkalmazás használatához',
					toggle: 'A Voice To Text alkalmazás elindult, nyomja meg az egyik meghatározott billentyűparancsot az alkalmazás használatához',
				},
			},
			chrome: {
				starting: 'A Google Chrome indítása fej nélküli módban...',
				initializing: 'A Chrome-példány inicializálása...',
			},
			updater: {
				starting: 'Automatikus frissítés-ellenőrző indítása...',
				updateAvailable: 'Van egy frissítés! Kérjük, indítsa újra az alkalmazást a frissítés elindításához!',
			},
			registering: {
				ioHook: 'Io hook regisztrálása...',
				commands: 'Parancsok regisztrálása...',
			},
			keyPressed: 'Lenyomva: {0}',
			activeButtons: 'Aktív gombok: {0}',
			creatorsCredits: {
				wrapper: '> = = = = = < alkotók & kreditek > = = = = = <',
				createdBy: ' Készítette: EnergyPatrikHU (https://energypatrik.hu)',
				ideaBy: ' Ötlet Írta: HUMROLI1 (https://humroli1.hu)',
			},
			commandsEnabled: "Mondja vagy írja be, hogy '{0}parancsok' az elérhető parancsok listázásához!",
		},

		soundWrapper: {
			playingSound: 'Hang lejátszása...',
		},

		getChromeInstallLocation: {
			chrome: {
				cannotFind: 'Nem található a chrome az egyéni elérési úton, az alapértelmezett elérési utak keresése...',
			},
		},

		config: {
			macro: {
				notExists: 'A makró konfigurációs fájl nem létezik, új makró konfigurációs fájl készítése!',
			},
			config: {
				wrapper: '> = = = = = < konfiguráció > = = = = = <',
				broken: 'Konfigurációs hiba! Úgy tűnik, hogy a konfigurációs fájl meghibásodott, új fájl készítése!',
				notExists: 'Konfigurációs hiba! A konfigurációs fájl nem létezik, új konfigurációs fájl készítése!',
				loaded: 'Konfiguráció betöltve!',
				error: {
					partialHoldToActivate: 'Konfigurációs hiba! Az „output.partial” nem lehet „true”, míg az „input.holdToActivate” „true”!',
					punctuationMarksPartial: 'Konfigurációs hiba! A „replacers.punctuationMarks” nem lehet „true”, míg az „output.partial” értéke „igaz”!',
					gameChatPrefixesPartial: 'Konfigurációs hiba! A „replacers.gameChatPrefixes” nem lehet „true”, míg az „output.partial” „true”!',
					commandsPartial: 'Konfigurációs hiba! A „commands.enabled” nem lehet „true”, míg az „output.partial” értéke „igaz”!',
				},
			},
		},

		commandHandler: {
			unknownMacro: 'Ismeretlen makró!',
			unknownCommand: 'Ismeretlen parancs!',
		},

		chromeInstance: {
			chrome: {
				navigating: 'Navigálás a Chrome-ban...',
				registeringEvents: 'Chrome-események regisztrálása...',
			},
			exposingPageFunctions: 'Oldalfunkciók megjelenítése...',
			speechRecognition: {
				starting: 'Beszédfelismerő motor indítása...',
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
				description: 'Frissítést keress az alkalmazáshoz.',
				checkingUpdate: 'Frissítés keresése...',
				noUpdateAvailabe: 'Nincs elérhető frissítés.',
				updateAvailabe: 'Frissítés elérhető! Kérjük, várjon, az alkalmazás frissítése...',
			},

			showActiveButtons: {
				description: 'Kiírja az aktív gombok listáját, hasznos arra, hogy be állítsd a kívánt gomb kombinációt a voice-to-text aktíválásához.',
				showActiveButtons: {
					enabled: 'Aktív gombok megjelenítése: Engedélyezve',
					disabled: 'Aktív gombok megjelenítése: Letiltva',
				},
			},

			mtaMode: {
				description: 'Az `mtaConsoleInputMode` beállítás jelenlegi értékének az ellenkezőjére állítja be. (true => false | false => true)',
				mtaConsoleInputMode: {
					enabled: 'MTA konzol beviteli mód: Engedélyezve',
					disabled: 'MTA konzol beviteli mód: Letiltva',
				},
			},

			exitMta: {
				description: 'Bezárja az MTA San Andreas programot.',
				notInForeground: 'MTA:SA nincs előtérben!',
			},

			exit: {
				description: 'Bezárja ezt a programot.',
				closingApp: 'Az alkalmazás bezárása...',
			},

			delete: {
				description: 'Szavak és betük törlése, pl: !törlés:3:betű => 3 darab betű törlésre kerül.',
				removedChars: '{0} karakter eltávolítva!',
				removedWords: '{0} szó eltávolítva!',
			},

			commandList: {
				description: 'Parancs lista.',
				list: {
					wrapper: '> = = = = = < commands > = = = = = <',
					name: ' Név:',
					availability: ' Elérhetőség:',
					syntax: ' Használat:',
					description: ' Leírás:',
				},
				availabilityMap: {
					both: 'szöveg és beszéd',
					text: 'csak szöveg',
					speech: 'csak beszéd',
				},
			},

			activeWindow: {
				description: 'Jelenleg előtérben lévő ablak lekérése.',
				activeWindow: 'Aktív ablak: {0}',
			},
		},

		chromeFunctions: {
			speechRecognition: {
				outputStopped: "Kimenet leállítva a 'Escape' megnyomása gomb által!",
				start: {
					outputPrefix: 'Kimeneti előtag: {0}',
				},
				info: {
					started: 'Beszédfelismerés elindult',
					stopped: 'Beszédfelismerés leállt',
					restarted: 'Beszédfelismerés újraindítva',
					output: 'Kimenet: {0}',
				},
				transcript: {
					partialOutput: 'Részleges kimenet: {0}',
				},
			},
		},
	},
};

export default huLang;
