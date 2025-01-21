import {Tour} from "@/types/tourGuide.ts";

export const tourGuideSteps: Tour = {
		'explore' : [
				{
						selector: '.nav-explore',
						content: 'Explore profiles based on your selected preferences (male, female, or everyone). You can view profiles and apply filters to narrow your search results.',
				},
				{
						selector: '.nav-swipe-and-match',
						content: 'Swipe through profiles one at a time, based on your selected preferences. Swipe right to like a profile, or left to dislike it.',
				},
				{
						selector: '.nav-matches',
						content: 'View all the likes you’ve received and the matches you’ve made with other users on the platform.',
				},
				{
						selector: '.nav-chat',
						content: 'Chat with other users, whether they are your matches or not. Connect and start conversations easily.',
				},
				{
						selector: '.nav-user-profile',
						content: 'View and edit your personal profile. Update your picture, modify details, manage subscriptions, and buy credits directly from here.',
				},
				{
						selector: '.nav-notification',
						content: 'Check your notifications, including new likes, matches, and any other updates on your activity.',
				},
				{
						selector: '.advanced-search-btn',
						content: 'Set your advanced search preferences, such as gender, location, and other filters to refine your search experience.',
				},
				{
						selector: '.advanced-search-btn2',
						content: 'Confirm and apply the advanced search settings and preferences you’ve updated for them to take effect.',
				},
				{
						selector: '.dashboard-layout__matches-wrapper',
						content: 'Review the matches you’ve made with other users on the platform, based on mutual interest and likes.',
				}
		],
		'swipe-and-match' : [],
		'matches' : [],
		'chat' : [],
		'user-profile' : []
}



export const styles = {
		popover: (base: any) => ({
				...base,
				'--reactour-accent': 'linear-gradient(90deg, #F2243E, #FB923C)',
				borderRadius: '12px',
				padding: '24px',
				height: '160px',
				width: '240px',
				fontSize: '16px',
				boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
		}),
		maskArea: (base: any) => ({
				...base,
				rx: '8px',
		}),
		badge: (base: any) => ({
				...base,
				background: 'linear-gradient(90deg, #F2243E, #FB923C)',
				padding: '4px 8px',
				borderRadius: '9999px',
				fontSize: '14px',
				fontWeight: 'bold',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '20px',
				height: '20px',
		}),
		controls: (base: any) => ({
				...base,
				display: 'flex',
				justifyContent: 'space-between',
				marginTop: '40px',
				position: 'absolute',
				bottom: '8px',
				left: '12px',
				right: '12px',
		}),
		button: (base: any) => ({
				...base,
				padding: '3px 6px',
				borderRadius: '9999px',
				background: 'linear-gradient(90deg, #F2243E, #FB923C)',
				color: '#ffffff',
				border: 'none',
				cursor: 'pointer',
				fontSize: '26px',
				fontWeight: '500',
				transition: 'transform 0.2s ease',
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
				'&:hover': {
						transform: 'scale(1.05)',
				},
		}),
		close: (base: any) => ({
				...base,
				right: '10px',
				top: '5px',
				width: '21px',
				height: '21px',
				color: '#6B7280',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				border: '1px solid #E5E7EB',
				transition: 'background-color 0.2s ease',
				'&:hover': {
						backgroundColor: '#F3F4F6',
						color: '#111827',
				},
		}),
}