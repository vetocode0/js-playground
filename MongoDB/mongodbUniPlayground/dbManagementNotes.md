Write concerns
w:0 - fire and forget
w:1 - ensure that at least one db completed the write before success is returned
w:majority - esures that the majority of dbs completed the write before success is returned.

when selecting {w: majority} always specify the timeout {w: 'majority', wtimeout: 5000}
Always configure for and handle serverSelectionTimeout errors. by default this is raised after 30 seconds (it's handled in the mflix app)
