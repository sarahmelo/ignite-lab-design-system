import { Meta, StoryObj } from '@storybook/react'
import { Signin } from './Signin'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw';

export default {
	title: 'Page/Sign in',
	component: Signin,
	parameters: {
		msw: {
			handlers: [
				rest.post('/sessions', (req, res, ctx) => {
					return res(ctx.json({
						message: "Login Realizado"
					}))
				})
			]
		}
	}
} as Meta

export const Default: StoryObj = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'sarah@mailiantor.com')
		userEvent.type(canvas.getByLabelText('Sua senha'), 'pastelzinho')
		
		userEvent.click(canvas.getByRole('button'))
		
		await waitFor(() => {
			expect(canvas.getByText('Login Realizado')).toBeInTheDocument()
		})
	}
}
