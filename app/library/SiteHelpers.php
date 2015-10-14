<?php

class SiteHelpers
{
/**
* Returns body classes made up by URI segments (http://laravelsnippets.com/snippets/add-body-classes-helper)
*
* @return string
*/
    public static function bodyClass()
    {
        $body_classes = [];
        $class = "";

        foreach ( Request::segments() as $segment )
        {
        if ( is_numeric( $segment ) || empty( $segment ) ) {
        continue;
        }

        $class .= ! empty( $class ) ? "-" . $segment : $segment;

        array_push( $body_classes, $class );
        }

        return ! empty( $body_classes ) ? implode( ' ', $body_classes ) : NULL;
    }

	//Checks if a value exists within any multidimensional array within a parent array (http://stackoverflow.com/questions/4128323/in-array-and-multidimensional-array)
    public static function in_array_r($needle, $haystack, $strict = false) {
        foreach ($haystack as $item) {
            if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && SiteHelpers::in_array_r($needle, $item, $strict))) {
                return true;
            }
        }

        return false;
    }


	//Collects all the Exception Details in a logical manner and then logs it in the default laravel.log file as well as sends an error email to the admin
	public static function log_mail_error($exception)
	{
		//Collect the exception details
		$exception_details = array(
			array(
				'header' => 'Message',
				'copy' => $exception->getMessage()
			),
			array(
				'header' => 'Code',
				'copy' => $exception->getCode()
			),
			array(
				'header' => 'File Name',
				'copy' => $exception->getFile()
			),
			array(
				'header' => 'Line Number',
				'copy' => $exception->getLine()
			)
		);

		foreach ($exception_details as $detail_information) {
			if (!isset($exception_details_log)) {
				//Runs through each exception detail information and adds it to the copy for the log file
				$exception_details_log = "\n" . $detail_information['header'] . ": " . $detail_information['copy'];
			} else {
				$exception_details_log .= "\n" . $detail_information['header'] . ": " . $detail_information['copy'];
			}
		}

		//Log the exception error to laravel.log(default log file)
		Log::error($exception_details_log);

		//Send an email to the site administrator with the exception details
		Mail::send('emails.error', array('exception_details' => $exception_details), function ($message) {
			$message->from('errors@langjugate.com', 'Langjugate Error Mailer');
			$message->to('langjugate@gmail.com', 'Langjugate Administrator')->subject('Error reported on Langjugate');
		});

		return $exception_details;
	}
}

